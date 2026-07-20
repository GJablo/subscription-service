import Subscription from "../models/subscription.model.js";
import dayjs from "dayjs";
import { sendReminderEmail } from "../utils/send-email.js";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

const REMINDERS = [7, 5, 2, 1]; // days before renewal date to send reminders

export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;
  const subscription = await fetchSubscription(context, subscriptionId);

  if (!subscription || subscription.status !== "active") return;

  const renewalDate = dayjs(subscription.renewalDate);
  if (renewalDate.isBefore(dayjs())) {
    console.log(
      `Renewal date for subscription ${subscriptionId} has already passed.`,
    );
    return; // exit if the renewal date has already passed
  }

  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");
    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(
        context,
        `${daysBefore} days before renewal`,
        reminderDate,
      );
    }
    if (dayjs().isSame(reminderDate, "day")) {
      await triggerReminder(
        context,
        `${daysBefore} days before reminder`,
        subscription,
      );
    }
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", async () => {
    return Subscription.findById(subscriptionId).populate({
      path: "user",
      select: "name email",
    });
  });
};

// Sleep until the specified reminder date and then send the reminder
const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date}`);
  await context.sleepUntil(label, date.toDate());
};

// trigger the sendReminders workflow for a specific subscription
const triggerReminder = async (context, label, subscription) => {
  return await context.run(label, async () => {
    console.log(`Triggering ${label}`);
    // send reminder logic (email, sms, push notification....)

    await sendReminderEmail({
      to: subscription.user.email,
      type: label,
      subscription: subscription,
    });
  });
};

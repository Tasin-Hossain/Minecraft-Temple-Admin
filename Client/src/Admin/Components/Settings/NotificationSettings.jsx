import Button from "../../../Components/ui/Button";
import { Checkbox } from "../../../Components/ui/Checkbox";
import { Radio } from "../../../Components/ui/Radio";
import SimpleToggle from "../../../Components/ui/Switches";

export const NotificationSettings = () => {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="mb-2">Notifications</h1>

        {/* Enable desktop notification */}
        <div className="flex items-center justify-between border-b border-(--border)">
          <div className=" py-6">
            <h2>Enable desktop notification</h2>
            <p>
              Decide whether you want to be notified of new message & updates
            </p>
          </div>
          <SimpleToggle />
        </div>

        {/* Enable unread notification badge */}
        <div className="py-6 border-b border-(--border)">
          <h2 className="mb-2">Enable unread notification badge</h2>
          <Radio
            id="option-1"
            name="account-type"
            label="All new messages"
            title="Broadcast notifications to the channel for each new message"
            onChange={() => setValue("personal")}
          />

          <Radio
            id="option-2"
            name="account-type"
            label="Mentions only"
            title="Only alert me in the channel if someone mentions me in a message"
            onChange={() => setValue("business")}
          />

          <Radio
            id="option-2"
            name="account-type"
            label="Nothing"
            title="Don't notify me anything"
            onChange={() => setValue("business")}
          />
        </div>

        {/* Email notification */}
        <div className="flex items-center justify-between">
          <div className=" py-6">
            <h2>Email notification</h2>
            <p>
              Substance can send you email notification for any new direct
              message
            </p>
          </div>
          <SimpleToggle />
        </div>

        <div className="flex flex-col gap-6">
          <Checkbox id="new-msg" label="New messages and chat" defaultChecked />
          <Checkbox id="updates" label="News & updates" defaultChecked />
          <Checkbox id="marketing" label="Offer & promotions" />
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="primary">Save Notification Preferences</Button>
      </div>
    </div>
  );
};

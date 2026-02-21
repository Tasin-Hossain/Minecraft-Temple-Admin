import Button, { ButtonGreen } from "../../../Components/ui/Button";
import { Checkbox } from "../../../Components/ui/Checkbox";
import { Input } from "../../../Components/ui/Input";
import { FcGoogle } from "react-icons/fc";

export const SecuritySettings = () => {
  return (
    <form className="space-y-10">
      <div className="space-y-6 rounded-md p-6">
        <div>
          <h1>Change Password</h1>
          <p className="p">
            Remember, your password is your digital key to your account. Keep it
            safe, keep it secure!
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 ">
          {/* Current pass */}
          <Input
            label="Current password"
            id="currentPassword"
            type="password"
          />

          {/* new pass */}
          <Input label="New password" id="newPassword" type="password" />

          {/* Confirm pass */}
          <Input
            label="Confirm new password"
            id="confirmPassword"
            type="password"
            className="sm:col-span-2"
          />
        </div>

        <div className="flex justify-end">
          <Button variant="primary">Update Security Settings</Button>
        </div>
        <div className="space-y-4">
          <div className="pb-4 border-b border-(--border)">
            <h1>Two-Factor Authentication</h1>
            <p>
              Your account holds great value to hackers. Enable two-step
              verification to safeguard your account!
            </p>
          </div>

          <div className="flex items-center justify-between ">
            {/* icon */}
            <div className="flex items-center  gap-2">
              <FcGoogle size={40} />
              <div className="flex flex-col">
                <h2>Google Authenticator</h2>
                <p>
                  Using Google Authenticator app generates time-sensitive codes
                  for secure logins.
                </p>
              </div>
            </div>

            <ButtonGreen>Enable</ButtonGreen>
          </div>
        </div>
      </div>
    </form>
  );
};

import Button from "../../../Components/ui/Button";
import { Radio } from "../../../Components/ui/Radio";
import { Select } from "../../../Components/ui/Select";

export const PreferenceSettings = () => {
  return (
    <form className="space-y-10">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Theme</h3>
        <div className="mt-4 flex gap-6">
          <Radio id="theme-light" name="theme" label="Light" defaultChecked />
          <Radio id="theme-dark" name="theme" label="Dark" />
          <Radio id="theme-system" name="theme" label="System" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900">Language</h3>
        <Select
          id="language"
          options={[
            { value: "en", label: "English" },
            { value: "bn", label: "বাংলা" },
          ]}
          defaultValue="en"
          className="mt-2 max-w-xs"
        />
      </div>

      <div className="flex justify-end">
        <Button variant="primary">Save Preferences</Button>
      </div>
    </form>
  );
};
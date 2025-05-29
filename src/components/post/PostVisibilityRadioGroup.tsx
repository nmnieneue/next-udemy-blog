import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "../ui/label";

type PublishedProps = {
  published: boolean;
  setPublished: (value: boolean) => void;
};

export default function PostVisibilityRadioGroup({
  published,
  setPublished,
}: PublishedProps) {
  return (
    <RadioGroup
      value={published.toString()}
      name="published"
      onValueChange={(value) => setPublished(value === "true")}
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="true" id="published-one" />
        <Label htmlFor="published-one">表示</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="false" id="published-two" />
        <Label htmlFor="published-two">非表示</Label>
      </div>
    </RadioGroup>
  );
}

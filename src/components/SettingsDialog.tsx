
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ServiceField {
  label: string;
  key: string;
}

const SERVICES: ServiceField[] = [
  { label: "BE", key: "be" },
  { label: "どんぐり", key: "donguri" },
  { label: "UPLIFT", key: "uplift" },
];

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isDarkMode: boolean;
}

export function SettingsDialog({ open, onOpenChange, isDarkMode }: SettingsDialogProps) {
  // ローカルストレージから初期値取得
  const [fields, setFields] = useState(() => {
    const saved = localStorage.getItem("settings");
    if (saved) return JSON.parse(saved);
    return {
      be_email: "",
      be_password: "",
      donguri_email: "",
      donguri_password: "",
      uplift_email: "",
      uplift_password: "",
    };
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("settings", JSON.stringify(fields));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={isDarkMode ? 'bg-[#252526] border-[#3e3e42] text-[#cccccc]' : 'bg-white border-gray-300 text-black'}>
        <DialogHeader>
          <DialogTitle className={isDarkMode ? 'text-[#cccccc]' : 'text-black'}>設定</DialogTitle>
          <DialogDescription className={isDarkMode ? 'text-[#6a6a6a]' : 'text-gray-600'}>
            5ちゃんねる外部サービスのログイン情報を入力してください。
          </DialogDescription>
        </DialogHeader>
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          {SERVICES.map((service) => (
            <div key={service.key} className="grid grid-cols-2 gap-3 items-center">
              <Label className={`col-span-2 font-bold ${isDarkMode ? 'text-[#cccccc]' : 'text-black'}`}>{service.label}</Label>
              <div>
                <Label htmlFor={`${service.key}_email`} className={`text-xs ${isDarkMode ? 'text-[#cccccc]' : 'text-black'}`}>メール</Label>
                <Input
                  id={`${service.key}_email`}
                  name={`${service.key}_email`}
                  type="email"
                  autoComplete="username"
                  value={fields[`${service.key}_email`] || ""}
                  onChange={handleChange}
                  className={`mt-1 ${isDarkMode ? 'bg-[#3e3e42] border-[#6a6a6a] text-[#cccccc]' : 'bg-white border-gray-300 text-black'}`}
                />
              </div>
              <div>
                <Label htmlFor={`${service.key}_password`} className={`text-xs ${isDarkMode ? 'text-[#cccccc]' : 'text-black'}`}>パスワード</Label>
                <Input
                  id={`${service.key}_password`}
                  name={`${service.key}_password`}
                  type="password"
                  autoComplete="current-password"
                  value={fields[`${service.key}_password`] || ""}
                  onChange={handleChange}
                  className={`mt-1 ${isDarkMode ? 'bg-[#3e3e42] border-[#6a6a6a] text-[#cccccc]' : 'bg-white border-gray-300 text-black'}`}
                />
              </div>
            </div>
          ))}
          <DialogFooter className="pt-2">
            <Button type="submit" className="w-full">保存</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

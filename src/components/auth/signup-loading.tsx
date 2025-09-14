import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Upload, User } from "lucide-react";

export function SignUpLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Profile Picture Section */}
      <div className="flex items-center space-x-4">
        <Avatar className="w-16 h-16">
          <AvatarFallback className="bg-gray-200">
            <User className="w-8 h-8 text-gray-400" />
          </AvatarFallback>
        </Avatar>
        <div>
          <Button
            variant="outline"
            size="sm"
            disabled
            className="flex items-center space-x-2"
          >
            <Upload className="w-4 h-4" />
            <span>Upload</span>
          </Button>
        </div>
      </div>

      {/* Name Field */}
      <div className="space-y-2">
        <Label className="text-gray-400">Name</Label>
        <Input
          type="text"
          placeholder="Name"
          disabled
          className="w-full bg-gray-100"
        />
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label className="text-gray-400">Email</Label>
        <Input
          type="email"
          placeholder="Email"
          disabled
          className="w-full bg-gray-100"
        />
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label className="text-gray-400">Password</Label>
        <Input
          type="password"
          placeholder="Password"
          disabled
          className="w-full bg-gray-100"
        />
        <p className="text-xs text-gray-400">Minimum 8 characters.</p>
      </div>

      {/* Submit Button */}
      <Button
        type="button"
        className="w-full bg-gray-300 text-gray-500 font-medium py-3"
        disabled
      >
        Sign Up
      </Button>
    </div>
  );
}

import AuthModel from "@/models/AuthModel";
import Profile from "@/models/ProfileModel";
import { User } from "@/models/UserModel";

export interface ProfileSettingDetails extends Profile, User, AuthModel {
  confirmPassword?: string;
}

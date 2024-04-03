import { getCurrentUser } from "@/app/actions/getCurrentUser";
import ProfilePage from "@/app/components/Dashboard/ProfilePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Edit your profile here.",
};

const Profile = async () => {
  const user = await getCurrentUser();
  return <ProfilePage user={user} />;
};

export default Profile;

import { getCurrentUser } from "@/app/actions/getCurrentUser";
import ProfilePage from "@/app/components/Dashboard/ProfilePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Edit your profile here.",
};

interface User {
  email: string;
  name: string;
  image: string;
}

interface UserProps {
  user: User;
}

const Profile: React.FC<UserProps> = async () => {
  const user = await getCurrentUser();
  return <ProfilePage user={user} />;
};

export default Profile;

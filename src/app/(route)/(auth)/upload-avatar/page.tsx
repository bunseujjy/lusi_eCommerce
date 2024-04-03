import AvatarUploader from "@/app/components/Authentication/AvatarUploader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload avatar",
  description: "Upload avatar",
};

const UploadAvatarPage = () => {
  return (
    <div>
      <AvatarUploader />
    </div>
  );
};

export default UploadAvatarPage;

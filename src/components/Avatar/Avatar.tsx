import ProgressiveImg from "../ProgressiveImg/ProgressiveImg";
import AvatarWrapper from "./avatar";
import avatarLinks from "./avatarConfig";

const Avatar = ({
  onImgClick,
}: {
  onImgClick: (value: string, placeholder: string) => void;
}) => {
  return (
    <>
      <span>Choose an avatar</span>
      <AvatarWrapper>
        {avatarLinks.map((link) => (
          <ProgressiveImg
            key={link}
            src={link}
            alt={"Avatar"}
            onClick={() => onImgClick(link, link)}
          />
        ))}
      </AvatarWrapper>
    </>
  );
};

export default Avatar;

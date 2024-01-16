import AvatarWrapper from "./Avatar";
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
          <img
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

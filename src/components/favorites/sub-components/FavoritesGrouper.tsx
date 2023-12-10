import React from "react";

interface FavoritesGrouperProps {
  iconSrc: string;
  text: string;
  count: number;
}

const FavoritesGrouper: React.FC<FavoritesGrouperProps> = ({
  iconSrc,
  text,
  count,
}) => {
  return (
    <div className="favorites-grouper">
      <img src={iconSrc} alt={`${text} icon`} />
      <p>{text}</p>
      <p>
        <span>({count})</span>
      </p>
    </div>
  );
};

export default FavoritesGrouper;

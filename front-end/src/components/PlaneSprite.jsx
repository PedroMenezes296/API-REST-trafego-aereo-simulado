function PlaneSprite({ top, left, label }) {
  return (
    <div
      className="plane-sprite"
      style={{
        top: `${top}px`,
        left: `${left}px`,
      }}
    >
      ✈️
      <span>{label}</span>
    </div>
  );
}

export default PlaneSprite;

interface CardProps {
  title: string;
  text: string;
  imgSrc: string;
  imgAlt: string;
}

const Card = ({ title, text, imgSrc, imgAlt }: CardProps) => {
  return (
    <div class="card bg-base-100 w-96 shadow-sm">
      <div class="card-body">
        <h2 class="card-title">{title}</h2>
        <p>
          {text}
        </p>
      </div>
      <figure>
        <img
          src={imgSrc}
          alt={imgAlt}
        />
      </figure>
    </div>
  );
};

export default Card;

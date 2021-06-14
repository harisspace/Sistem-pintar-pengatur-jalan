interface Props {
  system: any;
}

export const SearchCard: React.FC<Props> = ({ system }) => {
  return (
    <a href="/" className="flex items-center bg-white w-full py-3 px-2 border bottom-3">
      <div className="w-8 h-8">
        <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/${system.image_uri}`} alt={`${system.name}`} />
      </div>
      <div>
        <span className="ml-4">{system.name}</span>
      </div>
    </a>
  );
};

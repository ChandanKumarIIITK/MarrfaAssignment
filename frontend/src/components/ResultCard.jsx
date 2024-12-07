import PropTypes from 'prop-types';

const ResultCard = ({ item }) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-lg font-bold text-gray-800">{item}</h2>
    </div>
  );
};

ResultCard.propTypes = {
  item: PropTypes.string.isRequired,
};

export default ResultCard;

import { RotatingLines } from 'react-loader-spinner';

const Loader = ({ isLoading }) => {
    return (
        <div>
            {isLoading && (
                <RotatingLines
                    strokeColor="grey"
                    strokeWidth="3"
                    animationDuration="0.75"
                    width="48"
                    visible={true}
                />
            )}
        </div>
    );
}

export default Loader;

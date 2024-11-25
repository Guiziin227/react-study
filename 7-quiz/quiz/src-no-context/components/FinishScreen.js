const FinishScreen = ({maxPoints, points, highscore}) => {

    const percentage = (points / maxPoints) * 100;

    return (
        <>
            <p className="result">
                Você marcou <strong>{points}</strong> de {maxPoints} pontos {Math.ceil(percentage)}%.
            </p>
            <p className="highscore">
                (Highscore: {highscore})
            </p>
        </>
    );
};

export default FinishScreen;
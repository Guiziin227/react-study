const Start = ({numQuestions}) => {
    return (
        <div className="start">
            <h2>Bem vindo ao Quiz</h2>
            <h3>Está pronto para fazer {numQuestions} questões?</h3>
            <button>Começar</button>
        </div>
    );
};

export default Start;
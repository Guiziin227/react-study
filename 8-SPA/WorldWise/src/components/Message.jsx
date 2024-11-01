import styles
    from "../../../../../../udemy/ultimate-react-course-main/11-worldwise/starter/components/Message.module.css";

function Message({message}) {
    return (
        <p className={styles.message}>
            <span role="img">👋</span> {message}
        </p>
    );
}

export default Message;

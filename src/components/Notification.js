const Notification = ({message}) => {
    
	if (message === null)
		return
    if (message.text === '')
        return
	return (
		<div className={`message ${message.class}`}>
			{ message.text }
		</div>
	);
}

export default Notification;

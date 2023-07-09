const fetchData = () => {
	return new Promise((resolve, reject) => (
		fetch('/load_data_db')
		.then(res => res.json())
		.then(data => resolve(data))
		.catch(err => reject(err))
		))
	}
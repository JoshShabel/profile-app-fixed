async function useForm(state) {
    const formData = new FormData()
    formData.append('name', state.name.trim());
    formData.append('email', state.email.trim());
    formData.append('bio', state.title.trim());
    formData.append('title', state.bio.trim());
    if (state.image) formData.append("image", state.image);
    fetch('https://web.ics.purdue.edu/~jshabel/create-table.php', {
            method: 'POST',
            redirect: 'follow',
            body: new URLSearchParams(formData)
        }
    )
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log('Error:', error));

    try {
        const response = await fetch('https://web.ics.purdue.edu/~jshabel/send-data.php', {
                method: 'POST',
                body: formData,
            }
        );
        const result = await response.json();
        //console.log(result.message);
    } catch (error) {
        console.log(error);
    }
    return formData
}


export default useForm;
import fetch from 'isomorphic-unfetch';
export default (req, res) => {
    let repo = req.query.repo_name;
    fetch('https://api.github.com/repos/*******/' + repo + '/commits?per_page=5', {
        // Pass the authorization header
        headers: {
            'Authorization': 'token ' + process.env.GITHUB_TOKEN,
        },
    })
        .then(response => response.json())
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => console.error(error));
}

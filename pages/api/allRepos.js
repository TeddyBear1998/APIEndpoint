import fetch from 'isomorphic-unfetch';
export default async (req, res) => {
    //  Array for all the reposotory names.
    let repoNames = [];
    // Number of the api page
    let pageNumber = 1;
    let reposExist = true;
    while(reposExist) {
        // Failsafe for the while loop not to run endlessly.
        if (pageNumber > 100) {
            break;
        }
        // Fetch the data from Github API into response variable.
        let response = await fetch('https://api.github.com/orgs/wunderio/repos?type=all&page=' + pageNumber + '&per_page=1000', {
            // Pass the authorization header
            headers: {
                'Authorization': 'token ' + process.env.GITHUB_TOKEN,
            },
        });
        // Jsonify the response.
        let data = await response.json();

        // Push data from api response into the repoNames array.
        for (let i = 0; i < data.length; i++) {
            repoNames.push(data[i].name);
        }

        // Check if there's any data on the new page - if not - break.
        if (!data.length) {
            reposExist = false;
            break;
        }
        // Increase page number for Github API request.
        pageNumber++;
    }
    // display the repoNames in the browser
    res.status(200).json(repoNames);
}

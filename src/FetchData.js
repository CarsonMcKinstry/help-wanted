export default function FetchData() {
    return window.fetch('https://api.github.com/repos/techlahoma/help-wanted/issues')
        .then(function(response) {
            return response.json();
        });
}
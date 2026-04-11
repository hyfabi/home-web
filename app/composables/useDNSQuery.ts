export function fetchQueryLog(){
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic aHlmYWJpOmVjalJBSmlaMjQ5VXlQUQ==");
    myHeaders.append("Content-Type", "*/*");
    myHeaders.append("Referrer-Policy", "no-referrer");

    fetch("http://10.0.0.101/control/querylog", {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        })
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}
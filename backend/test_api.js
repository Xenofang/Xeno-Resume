async function test() {
    try {
        console.log("Sending request to optimize...");
        const res = await fetch('http://localhost:5001/api/v1/resume/optimize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rawDescription: "Developed a web app that increased sales by 20%." })
        });
        const data = await res.json();
        console.log("Success! Data:", data);
    } catch (error) {
        console.error("Request failed completely:", error.message);
    }

    try {
        console.log("\nSending request to chat...");
        const res2 = await fetch('http://localhost:5001/api/v1/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: "Hello", resumeContext: { summary: "Software Engineer" } })
        });
        const data2 = await res2.json();
        console.log("Success! Chat:", data2);
    } catch (error) {
        console.error("Request failed completely:", error.message);
    }
}
test();

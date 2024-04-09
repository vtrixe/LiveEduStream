import { createServer, IncomingMessage, request, ServerResponse } from 'http';
import axios from 'axios';

let cookieCaptured = false;

async function getSessionToken(): Promise<void> {
    try {
        const response = await axios.get('http://localhost:3000/api/auth/token', {
            headers: {
                'Cookie': process.env.COOKIE || 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXYiOiJkdmJfMmQyUkpLN3hYQkxXMHFldEsxWUxCVWFqZHYyIiwiaWQiOiJjbGllbnRfMmQ4VTVDRnhPQmJnbFkzTnZ5U2JvM2F1ekN6Iiwicm90YXRpbmdfdG9rZW4iOiIxanNkaXgzeDhibGs0dHo0d2VraGs4eXMxbTB4MWJuZXg5MjY1angzIn0.ngEhu7LRQIPl7UrcWNa9n3J7WojlIW5Hp1iw5Vj4WR21WadFzIo8elxn_L_GVBf0TkcCQFMHHDQuRb93OX1tR3pfRcdlDzLxJh0HAV5GyjNtT5A-vhjfUuqgRSipJXFVJv8_n3ctJD1I4DK6yU8_ptfFXvWfA1rOyU34rHzqYi0-HGtvjSNsZkbwZkt4oaxht6Sx68wD4Y0yKl0LhTrm7VgXpPy03AKHt5LPPDtEdVtsdhkuIYJs_6axJ-TYRmQAQFa4YAsdN1zzAl9re8vuXFYThAkSyhikkg7G-F_uFBHccqfjcUZrYVDQlV_7VXYARYw1hMJd7xmMP9op7UlWXQ; __session=eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDExMUFBQSIsImtpZCI6Imluc18yYmgxR3FPMmwyMEJGcDZNQVRhT09nNE1IY04iLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJleHAiOjE3MDkzOTA2MjQsImlhdCI6MTcwOTM5MDU2NCwiaXNzIjoiaHR0cHM6Ly9wcm8tZ3J1Yndvcm0tMS5jbGVyay5hY2NvdW50cy5kZXYiLCJuYmYiOjE3MDkzOTA1NTQsIm9yZ19pZCI6Im9yZ18yZDhVVzc2MGI4bjZJOGJiaVdTQjlPckxkUkUiLCJvcmdfcGVybWlzc2lvbnMiOltdLCJvcmdfcm9sZSI6Im9yZzphZG1pbiIsIm9yZ19zbHVnIjoibXlmaXJzdHJvb20iLCJzaWQiOiJzZXNzXzJkOFVKREFMSHVSTWZmNllkc290VGlpektORiIsInN1YiI6InVzZXJfMmQ4VUo4Q01idnQ5OVF5d01mVFFCQVZMcEloIn0.eNWhfm8b41Yfb1o1ZVa5pK_rKRdFcSYpWrOr0qKjiw2VGtFASFhOB5wsfxsJaADHaOYj28n2-hnOIXCCTgzIaaoLd8N06kmUbf8wqe6Uw52zm7rrgTS1a_uklmL39QPrY--ReZR4cuBroQxJn-H7ybgq-ja8sdZzJznC4L92QEN7NxlueX4XRKUNoPZvugUMxccqgkUuMEaSeg_xdV96Y0A3So4SkejaqdKUkmB8UzDV6qNaKedP9a-D0bLuYg2nUmfWYmhmIqZxXRTNsqigJM3Lwz2Eyza_wLHTsePPH4G8ZSX7i-Zy9rXvBtuRf1I1RXIKGkeK49U4ZBwk-NVhaQ; zchat-session=Fe26.2*1*e167b405b856e70615b572efc427ee7146a4b7a3e187840fea786ab46cadef67*dB7REvLFQGrdnHSdRlccNA*wDlkM72S3o7CVxFarAuZIi0y8ifm9yAdazmwqICJpxZ9CGUw7KVngHUGeFEYTR7J*1712944917727*e1c47c769e02b582225d73ad5134139d4f39d54838e9fa574d9b85b3c6ca1724*_TncuXVLOnBqEQyEt9AmmwbP4CrM-DFdcBA5QHSHUHc~2; auth_session=c7e8nctdowaxszorj6mk78j5qadc9z5bhr4nvroq; authjs.csrf-token=7c6ef34aaf37d688a53e8e5a609db9b00d71212728d9fa47102d3bd09b4dfd55%7Cca0214b6ec6587057a5a6bc3dae85b21cd75f9ec831b64dca2606aa99bb5df3f; authjs.callback-url=http%3A%2F%2Flocalhost%3A3000%2Fsign-up; authjs.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoidlZKNGVZSHhDUFZuelNtb0kzLThDWWc1dmg2MWpib05Wa0pJUnRSME9NQWppT3hEbUJWMmp2ZGJpSmlFZGQzRkM2cHFqRzRhSTlpcTRFN3JJWUdiTVEifQ..Ondj45OPExrd2fUyIDmtwQ.bCVy4v0NHgwbv4L7y1ugpCmhkk4cTByw0gUSeLru6mDskW1mdREL9uCtZXJzdB17s8QU1Xctskw7MdjT4-oJDNVDOfe4ec4tvRPsb5M_t4k-_KPGrz_BsIdZyN6OvdsLVf63c2Fa1ujDnaqRF9psgMiQi9_FoA8qi9xonRl_wSkOzCbhmB5nui_9H7E0oozqxtwi6xE36WNirAEff8XqkU7o3IROnCOUIx4PLrqQz00Ov-KYVJnazXegGKutEYWps836-lG84rjrXH52a5TzItHByqpGWwjXx_L36GGEJF2zifZHIZQJ4nyoLJRk1TzA.da50cHTLlmn1onTcZCgDDjmSXtgPRTGA-mp1-cOOJx0',
            },
        });
        console.log('Session data:', response.data);
    } catch (error) {
        console.error('Error fetching session token:', error);
    }
}

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    const cookie = req.headers.cookie;


    if (!cookieCaptured && cookie) {
        console.log('Capturing cookie from the first request and making an API call...');
        getSessionToken().then(() => {
            console.log('API request made with the captured cookie.');
        }).catch(error => {
            console.error('Failed to make API request with captured cookie:', error);
        });
        cookieCaptured = true; 
    }

   
        if (cookie) {
            getSessionToken().then(() => {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Cookie forwarded and session token requested.\n');
            }).catch(error => {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Failed to forward cookie.\n');
            });
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('No cookie received to forward.\n');
        }
    
});

const PORT = 3003;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

    getSessionToken();



});

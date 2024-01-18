"use server"
import puppeteer from 'puppeteer';

export default async function genPDFweb(outputPath) {
    const browser = await puppeteer.launch({
        headless: 'new',
    });
    const page = await browser.newPage(); 
 
    const targetUrl = 'http://localhost:3000/shiftChange';
await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
 
    await page.pdf({ path: outputPath, format: 'A4' });

    await browser.close();
}

export async function getRandom(min: number, max: number) {
    const randomOrgUrl = `https://www.random.org/integers/?num=1&min=${Math.trunc(min)}&max=${Math.trunc(max)}&col=1&base=10&format=plain&rnd=new`;
        
    const fetch = (globalThis as any).fetch || require('node-fetch');
    const res = await fetch(randomOrgUrl);

    if(!res.ok) {
        throw new Error(`Error fetching random number: ${res.statusText}`);
    }

    const text = (await res.text()).trim();
    return parseInt(text, 10);
}
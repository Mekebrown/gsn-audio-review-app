/**
 * @returns {JSX.Element}
 */
export default function Page() {
    try {
        return <section>Pricing</section>;
    } catch (error: any) {
        throw new Error('Missing or invalid credentials. Have you created an access token using the Strapi admin panel? http://localhost:1337/admin/');
    }
};

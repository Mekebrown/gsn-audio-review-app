import sql from './db.js';

export const get_top_track_rating = async (data) => { 
    const queryResponse = await sql`
        SELECT media_id, rounded_rating
        FROM (
            SELECT media_id,
                ROUND(AVG(rating), 2) AS rounded_rating
            FROM ratings
            GROUP BY media_id
        ) subquery
        order by rounded_rating DESC LIMIT 1
    `;

    return queryResponse;
};

// import { get_top_track_rating } from "@/app/lib/db-related/query_strings_groups";
// let result = await get_top_track_rating();
// let mediaId = result[0].media_id;
// let topRating = result[0].rounded_rating;
// <p>BTW, the highest rated track is for track id #{mediaId} with a rating of {topRating}!</p>

export const get_top_track_rating2 = async (data) => {
    const query_response = await sql`
        SELECT media_id, rounded_rating
        FROM (
            SELECT media_id,
                ROUND(AVG(rating), 2) AS rounded_rating
            FROM ratings
            GROUP BY media_id
        ) subquery
        ORDER BY rounded_rating DESC
        LIMIT 1
    `;

    if (query_response.ok) {
        return query_response;
    }
};

export const get_avg_rating = async (data) => {
    const get_avg_track_rating_query = await sql`
        SELECT media_id, 
            AVG(rating) 
        FROM ratings 
        GROUP BY media_id 
        ORDER BY media_id
    `;

    return get_avg_track_rating_query;
};


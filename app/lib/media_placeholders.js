// The default export is mediaTrackExample
import { logoImage } from "@/app/lib/general_variables";
import StrapiHandler from "@/app/lib/strapiclient_handler";

export const allMedia = async () => {
	const mediaData = StrapiHandler.collection('medias');

	return (await mediaData.find({ populate: ["markers", "thumbnail_file", "media_file"] })).data;
};

export const audioExtensions = [
	"mp3",
	"wav",
	"ogg",
	"m4a",
	"aac",
	"flac",
	"wma",
	"aiff",
	"alac",
	"opus",
];

export const imgFileTypes = [
	"image/png",
	"image/bmp",
	"image/gif",
	"image/jpeg",
	"image/svg+xml",
	"image/tiff",
	"image/webp",
	"image/x-icon"
];

export const mediaContentTypesList = [
	"3D",
	"3DS",
	"AAC",
	"Album",
	"Android",
	"Anime",
	"Audiobook",
	"Bollywood",
	"Box Set",
	"Cartoon",
	"Comics",
	"Concerts",
	"DS",
	"DVD",
	"Discography",
	"Divx/Xvid",
	"Documentary",
	"Dreamcast",
	"Dual Audio",
	"Dubbed",
	"Dubs/Dual Audio",
	"E-Books",
	"Emulation",
	"GameCube",
	"Games",
	"HD",
	"HEVC/x265",
	"Hentai",
	"Images",
	"Linux",
	"Lossless",
	"MP3",
	"Mac",
	"Magazine",
	"Mobile Phone",
	"Mp4",
	"Nulled Script",
	"Other",
	"PC Game",
	"PC Software",
	"PS1",
	"PS2",
	"PS3",
	"PS4",
	"PSP",
	"Picture",
	"Radio",
	"Raw",
	"SD",
	"SVCD/VCD",
	"Single",
	"Sounds",
	"Subbed",
	"Switch",
	"Tutorials",
	"UHD",
	"Video",
	"Wii",
	"Xbox360",
	"bluray",
	"h.264/x264",
	"iOS",
	"web",
];

export const genres = [
	{ value: 'film-noir', label: "Film Noir" }, { valye: 'documentary', label: "Documentary" }, { value: 'adventure', label: "Adventure" }, { value: 'music', label: "Music" },
	{ value: 'romance', label: "Romance" }, { value: 'animation', label: "Animation" },
	{ value: 'crime', label: "Crime" }, { value: 'comedy', label: "Comedy" },
	{ value: 'talk-show', label: "Talk Show" }, { value: 'sport', label: "Sport" },
	{ value: 'news', label: "News" }, { value: 'biography', label: "Biography" },
	{ value: 'history', label: "History" }, { value: 'musical', label: "Musical" },
	{ value: 'horror', label: "Horror" }, { value: 'action', label: "Action" },
	{ value: 'sci-fi', label: "Sci Fi" }, { value: 'reality-tv', label: "Reality tv" },
	{ value: 'game-show', label: "Game Show" }, { value: 'war', label: "War" }, { value: 'adult', label: "Adult" },
	{ value: 'drama', label: "Drama" }, { value: 'mystery', label: "Mystery" }, { value: 'thriller', label: "Thriller" },
	{ value: 'western', label: "Western" }, { value: 'short', label: "Short" }, { value: 'fantasy', label: "Fantasy" },
	{ value: 'family', label: "Family" }
];

export const mediaTrackFileOnlyExample = {
	fileInfo: "https://ia800307.us.archive.org/17/items/RTFM-Harp-940531/940531_harp_01_ITH.mp3",
};

export const thumbFileOnlyExample = {
	thumbnail: logoImage,
};

export const isThumbFileImage = (imgFile) => {
	const imgFileName = imgFile.name;
	const imgFileExtension = imgFileName.split(".").pop().toLowerCase();

	return imgFileTypes.includes(imgFileExtension);
};

export const isValidFileType = (file) => {
	return fileTypes.includes(file.type);
};

export const isAudioFile = (file) => {
	const fileName = file.name;
	const fileExtension = fileName.split(".").pop().toLowerCase();

	return audioExtensions.includes(fileExtension);
};

export const getFileSize = (number) => {
	if (number < 1024) {
		return `${number} bytes`;
	} else if (number >= 1024 && number < 1048576) {
		return `${(number / 1024).toFixed(1)} KB`;
	} else if (number >= 1048576) {
		return `${(number / 1048576).toFixed(1)} MB`;
	}
};

export const singleMediaTrackExample = {
	id: 1,
	title: "The Title",
	thumbnail: logoImage,
	description:
		"This will be the track's description. Here you can learn more about it",
	lengthMS: 5290,
	notes: "The total notes from all users",
	project: "A Cool One",
	mp3: "https://ia800307.us.archive.org/17/items/RTFM-Harp-940531/940531_harp_01_ITH.mp3",
	ogg: "https://ia800307.us.archive.org/17/items/RTFM-Harp-940531/940531_harp_01_ITH.ogg",
	date: "2008-02-14",
	datetime: "2008-02-14 20:00",
	captions: "fgsubtitles_en.vtt",
};

const mediaTrackExample = [
	{
		id: 1,
		title: "Exceptional Title",
		thumbnail: logoImage,
		description:
			"This will be the track's description. Here you can learn more about it",
		lengthMS: 5290,
		notes: "The total notes from all users",
		project: "A Cool One",
		mp3: "https://ia800307.us.archive.org/17/items/RTFM-Harp-940531/940531_harp_01_ITH.mp3",
		ogg: "https://ia800307.us.archive.org/17/items/RTFM-Harp-940531/940531_harp_01_ITH.ogg",
		date: "2008-02-14",
		datetime: "2008-02-14 20:00",
		captions: "fgsubtitles_en.vtt",
	},
	{
		id: 2,
		title: "Second One",
		thumbnail: logoImage,
		description: "The second track's description.",
		lengthMS: 5290,
		notes: "The total notes from all users",
		project: "A Cool One",
		mp3: "https://ia800307.us.archive.org/17/items/RTFM-Harp-940531/940531_harp_01_ITH.mp3",
		ogg: "https://ia800307.us.archive.org/17/items/RTFM-Harp-940531/940531_harp_01_ITH.ogg",
		date: "2008-02-14",
		datetime: "2008-02-14 20:00",
		captions: "fgsubtitles_en.vtt",
	},
	{
		id: 3,
		title: "Three Litthe Pigs",
		thumbnail: logoImage,
		description:
			"This will be the track's description. Here you can learn more about it",
		lengthMS: 5290,
		notes: "The total notes from all users",
		project: "A Cool One",
		mp3: "https://ia800307.us.archive.org/17/items/RTFM-Harp-940531/940531_harp_01_ITH.mp3",
		ogg: "https://ia800307.us.archive.org/17/items/RTFM-Harp-940531/940531_harp_01_ITH.ogg",
		date: "2008-02-14",
		datetime: "2008-02-14 20:00",
		captions: "fgsubtitles_en.vtt",
	},
	{
		id: 4,
		title: "FOUR SCORES!!!",
		thumbnail: logoImage,
		description: "The second track's description.",
		lengthMS: 5290,
		notes: "The total notes from all users",
		project: "A Cool One",
		mp3: "https://ia800307.us.archive.org/17/items/RTFM-Harp-940531/940531_harp_01_ITH.mp3",
		ogg: "https://ia800307.us.archive.org/17/items/RTFM-Harp-940531/940531_harp_01_ITH.ogg",
		date: "2008-02-14",
		datetime: "2008-02-14 20:00",
		captions: "fgsubtitles_en.vtt",
	},
	{
		id: 5,
		title: "Titles, g",
		thumbnail: logoImage,
		description:
			"This will be the track's description. Here you can learn more about it",
		lengthMS: 5290,
		notes: "The total notes from all users",
		project: "A Cool One",
		mp3: "https://ia800307.us.archive.org/17/items/RTFM-Harp-940531/940531_harp_01_ITH.mp3",
		ogg: "https://ia800307.us.archive.org/17/items/RTFM-Harp-940531/940531_harp_01_ITH.ogg",
		date: "2008-02-14",
		datetime: "2018-02-14 20:00",
		captions: "fgsubtitles_en.vtt",
	},
	{
		id: 6,
		title: "Sixth One",
		thumbnail: logoImage,
		description: "The second track's description.",
		lengthMS: 5290,
		notes: "The total notes from all users",
		project: "A Cool One",
		mp3: "https://ia800307.us.archive.org/17/items/RTFM-Harp-940531/940531_harp_01_ITH.mp3",
		ogg: "https://ia800307.us.archive.org/17/items/RTFM-Harp-940531/940531_harp_01_ITH.ogg",
		date: "2008-02-14",
		datetime: "2008-02-14 7:15",
		captions: "fgsubtitles_en.vtt",
	},
];

export default mediaTrackExample;

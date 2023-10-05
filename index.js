const fs = require("fs");
const path = require("path");

function deleteVttFilesRecursively(directoryPath) {
	fs.readdir(directoryPath, (err, files) => {
		if (err) {
			console.error(`Error reading directory: ${err}`);
			return;
		}

		files.forEach((file) => {
			const filePath = path.join(directoryPath, file);

			fs.stat(filePath, (statErr, stats) => {
				if (statErr) {
					console.error(`Error reading file stats: ${statErr}`);
					return;
				}

				if (stats.isDirectory()) {
					// If it's a directory, recursively search it
					deleteVttFilesRecursively(filePath);
				} else if (path.extname(file) === ".txt" && !file.includes("English")) {
					// If it's a .vtt file and doesn't contain 'English' in its name, delete it
					fs.unlink(filePath, (unlinkErr) => {
						if (unlinkErr) {
							console.error(`Error deleting file ${filePath}: ${unlinkErr}`);
						} else {
							console.log(`Deleted file: ${filePath}`);
						}
					});
				}
			});
		});
	});
}

const inputDirectory = process.argv[2];

if (!inputDirectory) {
	console.error("Please provide a directory path as an argument.");
	process.exit(1);
}

deleteVttFilesRecursively(inputDirectory);

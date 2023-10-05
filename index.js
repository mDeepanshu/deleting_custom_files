const fs = require("fs");
const path = require("path");

function deleteVttFilesInDirectory(directoryPath) {
	fs.readdir(directoryPath, (err, files) => {
		if (err) {
			console.error(`Error reading directory: ${err}`);
			return;
		}

		files.forEach((file) => {
			const filePath = path.join(directoryPath, file);

			if (path.extname(file) === ".vtt") {
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
}

const inputDirectory = process.argv[2];

if (!inputDirectory) {
	console.error("Please provide a directory path as an argument.");
	process.exit(1);
}

deleteVttFilesInDirectory(inputDirectory);

# Package integrity

delivery-manifest.json lists every packaged file except itself, with byte size andSHA256. That normal self-exclusion is explicit. Sources and derived exports are separately classified; the manifest does not convert design completion into user acceptance or market evidence.

The packaging operation checks the final ZIP CRC, reads every listed member and compares itsSHA256 to this manifest. The receipt next to the ZIP records the resulting archive hash and outcome; an archive cannot contain its own final hash without a circular dependency. Keep that receipt with the ZIP for transfer verification.

The archive opens as oneDOLABY_COMPLETE_KITSfolder. Start with00_START_HERE/index.html. No installation, external account or publishing step is required to inspect the local sources.

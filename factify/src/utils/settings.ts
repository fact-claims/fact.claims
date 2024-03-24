import * as yaml from 'yaml';
import * as fs from 'fs';
import * as path from 'path';

const loadSettings = function(directory_path: string): Record<string, any> {
  try {
    const file_paths = fs.readdirSync(directory_path);
    const yaml_files = file_paths.filter(file_name => file_name.endsWith('.yaml'));

    if (yaml_files.length === 0) {
      throw new Error('No YAML files found in the specified directory.');
    }

    let settings: Record<string, any> = {};
    for (const yaml_file of yaml_files) {
      const file_path = path.join(directory_path, yaml_file);
      const raw_config = fs.readFileSync(file_path, 'utf8');
      const parsed_config = yaml.parse(raw_config);
      settings = { ...settings, ...parsed_config };
    }

    return settings;

  } catch (e: any) {
    console.error('config.problem: %o', e.message);
    process.exit(1);
  }
};

export { loadSettings };

import path from 'path';

export const resolve = {
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
  alias: {
    components: path.join(process.cwd(), '/app/src/components'),
    pages: path.join(process.cwd(), '/app/src/pages'),
  },
}
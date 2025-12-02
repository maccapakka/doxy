import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function (plop) {
  plop.setGenerator('component', {
    description: 'Create a new design system component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name (PascalCase):',
        validate: (value) => {
          if (!value) {
            return 'Component name is required';
          }

          // Check PascalCase format
          if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
            return 'Component name must be in PascalCase (e.g., Button, IconButton)';
          }

          // Check if component already exists
          const componentPath = path.join(
            __dirname,
            'packages/design-system/src/components',
            value
          );
          if (fs.existsSync(componentPath)) {
            return `Component "${value}" already exists`;
          }

          return true;
        },
      },
      {
        type: 'input',
        name: 'description',
        message: 'Component description:',
        validate: (value) => {
          if (!value) {
            return 'Description is required';
          }
          return true;
        },
      },
    ],
    actions: (data) => {
      const actions = [];

      // Generate component files
      actions.push({
        type: 'add',
        path: 'packages/design-system/src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/component/Component.tsx.hbs',
      });

      actions.push({
        type: 'add',
        path: 'packages/design-system/src/components/{{pascalCase name}}/{{pascalCase name}}.module.css',
        templateFile: 'plop-templates/component/Component.module.css.hbs',
      });

      actions.push({
        type: 'add',
        path: 'packages/design-system/src/components/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
        templateFile: 'plop-templates/component/Component.stories.tsx.hbs',
      });

      actions.push({
        type: 'add',
        path: 'packages/design-system/src/components/{{pascalCase name}}/{{pascalCase name}}.llm.md',
        templateFile: 'plop-templates/component/Component.llm.md.hbs',
      });

      actions.push({
        type: 'add',
        path: 'packages/design-system/src/components/{{pascalCase name}}/index.ts',
        templateFile: 'plop-templates/component/index.ts.hbs',
      });

      // Update package.json exports
      actions.push({
        type: 'modify',
        path: 'packages/design-system/package.json',
        pattern: /(\"exports\": \{)/,
        template: '$1\n    "./{{kebabCase name}}": "./src/components/{{pascalCase name}}/{{pascalCase name}}.tsx",',
      });

      // Success message
      actions.push({
        type: 'postAction',
        message: `
✅ Component {{pascalCase name}} created successfully!

📁 Files created:
   - packages/design-system/src/components/{{pascalCase name}}/{{pascalCase name}}.tsx
   - packages/design-system/src/components/{{pascalCase name}}/{{pascalCase name}}.module.css
   - packages/design-system/src/components/{{pascalCase name}}/{{pascalCase name}}.stories.tsx
   - packages/design-system/src/components/{{pascalCase name}}/{{pascalCase name}}.llm.md
   - packages/design-system/src/components/{{pascalCase name}}/index.ts

📦 Package export added to design-system/package.json

🚀 Next steps:
   1. Review generated files
   2. Customize component logic and styles
   3. Run 'pnpm storybook' to view in Storybook
   4. Update the .llm.md documentation with specific details
        `,
      });

      return actions;
    },
  });
}

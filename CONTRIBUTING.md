# Contributing to Incident Management Quiz

Thank you for considering contributing to the Incident Management Quiz! We welcome contributions from developers, incident management practitioners, and the broader engineering community.

## 🤝 Code of Conduct

This project adheres to a code of conduct adapted from the [Contributor Covenant](https://www.contributor-covenant.org/). By participating, you are expected to uphold this code.

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences  
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## 🚀 Getting Started

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/im-quiz.git
   cd im-quiz
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start development server**:
   ```bash
   npm run dev
   ```

### Development Environment

- **Node.js**: 18.17 or higher
- **Package Manager**: npm (comes with Node.js)
- **Editor**: VSCode recommended with TypeScript and Tailwind extensions

## 📝 How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear description** of the problem
- **Steps to reproduce** the behavior
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Environment details** (browser, OS, etc.)

### Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:

- **Clear description** of the enhancement
- **Use case** and business value
- **Implementation approach** if you have ideas
- **Alternative solutions** you've considered

### Pull Requests

1. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards

3. **Test your changes**:
   ```bash
   npm run build     # Ensure build passes
   npm run lint      # Check code style
   npm run type-check # Verify TypeScript
   ```

4. **Commit with conventional commits**:
   ```bash
   git commit -m "feat: add new question validation"
   git commit -m "fix: resolve scoring calculation bug"
   git commit -m "docs: update API documentation"
   ```

5. **Push to your fork** and create a pull request

## 🏗️ Development Guidelines

### Code Style

We use automated tools to enforce consistent code style:

- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting
- **TypeScript**: Type checking

Run `npm run lint` before committing to catch style issues.

### TypeScript Standards

- Use **strict mode** - all code must pass TypeScript strict checks
- Prefer **explicit types** over `any`
- Use **interfaces** for object shapes
- Document **complex type unions** with comments

Example:
```typescript
interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}
```

### React Component Guidelines

- Use **functional components** with hooks
- Implement **proper TypeScript props** interfaces
- Include **JSDoc comments** for complex components
- Follow **single responsibility principle**

Example:
```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick: () => void;
  disabled?: boolean;
}

/**
 * Reusable button component with incident.io styling
 */
export function Button({ children, variant = 'primary', onClick, disabled }: ButtonProps) {
  // Implementation
}
```

### Testing Guidelines

While we don't currently have a test suite, when adding tests:

- Use **Jest** and **React Testing Library**
- Write **unit tests** for utility functions
- Write **integration tests** for user flows
- Aim for **meaningful test coverage**, not just high percentages

### CSS/Styling Guidelines

- Use **Tailwind CSS** utility classes
- Follow **mobile-first** responsive design
- Use **incident.io color palette** defined in theme
- Avoid **custom CSS** unless absolutely necessary

## 📊 Quiz Content Guidelines

### Adding Questions

When contributing new quiz questions:

1. **Focus on practical knowledge** that incident responders need
2. **Avoid vendor-specific** tools unless industry standard
3. **Include clear explanations** for educational value
4. **Test with real practitioners** before submitting

### Question Structure

```typescript
{
  id: 13,
  question: "What is the primary purpose of an incident timeline?",
  options: [
    "To assign blame for the incident",
    "To create accurate documentation for post-mortem analysis", 
    "To satisfy compliance requirements",
    "To impress stakeholders with detailed logs"
  ],
  correctAnswer: 1,
  explanation: "An incident timeline provides accurate chronological documentation that enables effective post-mortem analysis and organizational learning."
}
```

### Question Quality Standards

- **Clear and unambiguous** wording
- **One obviously correct** answer
- **Plausible but incorrect** distractors
- **Educational explanations** that teach best practices
- **Industry-neutral** language when possible

## 🔄 Review Process

### Pull Request Review

All submissions require review before merging:

1. **Automated checks** must pass (build, lint, type-check)
2. **Code review** by maintainers
3. **Testing** on preview deployment
4. **Approval** from code owners

### Review Criteria

- **Functionality**: Does it work as intended?
- **Code Quality**: Is it readable and maintainable?
- **Performance**: Does it impact load times?
- **Accessibility**: Is it usable by everyone?
- **Security**: Are there any vulnerabilities?

## 🚀 Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Schedule

- **Regular releases**: When features are ready
- **Hotfixes**: For critical bugs
- **Security patches**: Immediate deployment

## 📚 Documentation

### Code Documentation

- **JSDoc comments** for public APIs
- **README updates** for new features
- **CHANGELOG entries** for all changes
- **Type definitions** with explanatory comments

### User Documentation

- **Clear setup instructions**
- **Troubleshooting guides**
- **Feature explanations**
- **API reference** (if applicable)

## 🏷️ Issue and PR Labels

We use labels to organize and prioritize work:

### Type Labels
- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Improvements to documentation
- `question`: Further information is requested

### Priority Labels
- `priority/high`: Critical issues
- `priority/medium`: Standard priority
- `priority/low`: Nice to have

### Status Labels
- `status/in-review`: Under review
- `status/needs-work`: Changes requested
- `status/ready`: Ready to merge

## 🎯 Areas for Contribution

We especially welcome contributions in these areas:

### High Priority
- **Question quality improvements**
- **Accessibility enhancements**
- **Performance optimizations**
- **Mobile experience improvements**

### Medium Priority
- **Additional quiz features**
- **Better error handling**
- **Enhanced analytics**
- **Internationalization support**

### Nice to Have
- **Advanced question types**
- **Gamification features**
- **Social sharing**
- **Custom theming**

## 📞 Getting Help

If you need help or have questions:

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For general questions and ideas
- **Email**: [Your contact email] for sensitive matters

## 🙏 Recognition

Contributors will be recognized in:

- **README acknowledgments**
- **Release notes** for significant contributions
- **GitHub contributors** page
- **Special thanks** in documentation

Thank you for making the Incident Management Quiz better for everyone! 🚀
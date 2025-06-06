# Daily Savings Challenge

A web application to track daily savings of ₹10 between two friends, Ayush and Sharu. The application helps maintain accountability and tracks streaks for consistent savings.

## Features

- 🎯 Daily savings tracking of ₹10
- 📊 Individual progress tracking for each participant
- 🔥 Streak counting for consistent savings
- 📅 One contribution per day limit
- 📱 Responsive design for mobile and desktop
- 🔒 Secure MongoDB integration

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Date Handling**: date-fns
- **Deployment**: Render.com

## Prerequisites

Before you begin, ensure you have:
- Node.js 18.x or later
- npm or yarn
- MongoDB database (local or Atlas)

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd challenge-zero
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Initialize the database with users:
   ```bash
   npx ts-node src/scripts/init-db.ts
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploying to Render.com

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the following:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment Variables: Add `MONGODB_URI`

## Project Structure

```
challenge-zero/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contribution/
│   │   │       └── route.ts
│   │   └── page.tsx
│   ├── lib/
│   │   └── db.ts
│   ├── models/
│   │   └── User.ts
│   └── scripts/
│       └── init-db.ts
├── .env.local
├── .gitignore
└── package.json
```

## API Endpoints

### GET /api/contribution
- Retrieves all users and their savings data
- No parameters required

### POST /api/contribution
- Adds a daily contribution for a user
- Request body: `{ "name": "Ayush" | "Sharu" }`
- Validates one contribution per day

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository.

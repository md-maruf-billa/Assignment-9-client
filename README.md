### 1. Clone the Repository

```bash
git clone https://github.com/md-maruf-billa/Assignment-9-client.git
cd Assignment-9-client
```

### 2. Install Dependencies

Using `npm`:

```bash
npm install
```

Or using `yarn`:

```bash
yarn add
```

### 3. Run the Development Server

```bash
npm run dev
```

---

## ⚙️ Environment Setup

Create a `.env` file by copying the contents of `.env.example`:

### For Windows (CMD):

```cmd
copy .env.example .env
```

### For Windows (PowerShell):

```powershell
Copy-Item .env.example .env
```

---

## 🛠️ Git Workflow for Contribution

### 1. Create a New Branch

```bash
git branch yourName/what_you_are_working_on
git switch yourName/what_you_are_working_on
```

Replace `yourName` with your actual name and `what_you_are_working_on` with a short description of the task you're handling.

### 2. Make Changes and Commit

```bash
git add .
git commit -m "Give a proper commit message"
```

### 3. Sync with Main Branch

```bash
git pull --rebase origin main
```

✅ If any conflicts appear, resolve them manually.

### 4. Push Your Work

```bash
git push --force-with-lease origin yourName/what_you_are_working_on
```

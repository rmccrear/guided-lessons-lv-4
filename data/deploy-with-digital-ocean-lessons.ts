import { Lesson } from '../types';

export const DEPLOY_WITH_DIGITAL_OCEAN_LESSONS: Lesson[] = [
  {
    id: "deploy-node-do-console-overview",
    title: "Overview",
    description: "Learn to deploy an existing Node.js application to a Droplet using the browser-based terminal, Git, and process management.",
    type: "exercise",
    content: `
**What you'll learn:**

- Accessing a Linux server via the Web Console
- Setting up the Node.js environment
- Deploying code with Git
- Configuring UFW (Uncomplicated Firewall)
- Managing processes with PM2
`
  },
  {
    id: "deploy-node-do-console-the-environment-setup",
    title: "The Environment Setup",
    description: "Learn to deploy an existing Node.js application to a Droplet using the browser-based terminal, Git, and process management.",
    type: "exercise",
    content: `
**Goal:** Log in to the server via the browser and install the Node.js runtime.

**User Story:** As a Developer, I want to access my server from a web browser so that I can configure the environment without needing local SSH keys.

### Instructions

1. **Launch the Console**

   - Log in to your DigitalOcean account.
   - Click on your Droplet's name.
   - In the top right corner, click the **"Console"** button.
   - *Wait for the terminal window to load. It acts as your root shell.*

2. **Update the System**
   Inside the web terminal, run:

   \`\`\`bash
   apt update
   \`\`\`

3. **Install Node.js**
   We need a modern version of Node. Run the following to add the NodeSource repository and install:

   \`\`\`bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   \`\`\`

4. **Verify Installation**
   Check that Node and Git are ready.

   \`\`\`bash
   node -v
   git --version
   \`\`\`
`
  },
  {
    id: "deploy-node-do-console-deployment-networking",
    title: "Deployment & Networking",
    description: "Learn to deploy an existing Node.js application to a Droplet using the browser-based terminal, Git, and process management.",
    type: "exercise",
    content: `
**Goal:** Clone your repository, install dependencies, and configure the firewall to allow traffic on Port 4000.

**User Story:** As a DevOps Engineer, I want to pull my code from a repository and open a network port so that the application is accessible to the outside world.

### Instructions

1. **Clone the Repository**
   Navigate to the web directory and clone the app.

   \`\`\`bash
   cd /var/www
   git clone https://github.com/bradtraversy/simple_node_app_4000.git
   \`\`\`

2. **Install Dependencies**
   Enter the project folder and install the libraries.

   \`\`\`bash
   cd simple_node_app_4000
   npm install
   \`\`\`

3. **Configure Firewall (UFW)**
   By default, external traffic to custom ports is blocked. Open port 4000:

   \`\`\`bash
   ufw allow 4000
   ufw reload
   \`\`\`

4. **Manual Test Run**
   Start the app manually to ensure it works.

   \`\`\`bash
   node index.js
   \`\`\`

5. **Verify in Browser**
   Open a new browser tab and visit \`http://<YOUR_DROPLET_IP>:4000\`. You should see the app running.

6. **Stop the App**
   Back in the console, press \`CTRL+C\` to stop the server so we can set up persistence in the next step.

### 💡 Code Hints

Need to find your IP address?


`
    ,codeSnippets: [
      {
        language: "bash",
        summary: "Show Me: IP Command",
        code: `
curl ifconfig.me
`,
        description: "Snippet for: Show Me: IP Command"
      }
    ]
  },
  {
    id: "deploy-node-do-console-challenge-persistence-with-pm2",
    title: "Challenge: Persistence with PM2",
    description: "Learn to deploy an existing Node.js application to a Droplet using the browser-based terminal, Git, and process management.",
    type: "challenge",
    content: `
**Goal:** Install a process manager (PM2) and configure the app to run in the background.

**User Story:** As a Site Reliability Engineer, I want to decouple the application execution from my active terminal session so that the website stays online even after I log out.

### The Task

You need to install the \`pm2\` package globally and use it to start your application file (\`index.js\`), ensuring it stays online when the console closes.

### Instructions

1.  Install PM2 globally using npm.
2.  Start the application using PM2.
3.  Verify the app status is "online".
4.  Close the DigitalOcean Console and verify the site still loads in your browser.

### 💡 Code Hints

Stuck on the commands?



### 🔍 Diving Deeper

**Why PM2?**
Standard \`node\` commands stop running when you close the terminal. PM2 (Process Manager 2) is a production-grade process manager that keeps apps alive forever, reloads them without downtime, and helps with common system admin tasks.
`
    ,codeSnippets: [
      {
        language: "bash",
        summary: "Show Me: The Solution",
        code: `
# 1. Install globally
npm install pm2 -g

# 2. Start the app
pm2 start index.js

# 3. Check status
pm2 list
`,
        description: "Snippet for: Show Me: The Solution"
      }
    ]
  },
  {
    id: "deploy-node-do-console-lesson-complete-",
    title: "Lesson Complete! 🎉",
    description: "Learn to deploy an existing Node.js application to a Droplet using the browser-based terminal, Git, and process management.",
    type: "exercise",
    content: `
**Congratulations!** You have deployed a live application without ever opening a terminal on your local computer.

### Summary

You verified the following skills:

- **Web Console Access:** Managing a server via the browser.
- **Git Deployment:** Pulling code from a remote repository.
- **Firewall Management:** Opening specific ports for application traffic.
- **Process Management:** Keeping an app alive with PM2.

### Next Steps

Try configuring a domain name for your Droplet to replace that IP address!
`
  }
];

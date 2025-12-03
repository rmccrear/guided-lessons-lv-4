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
    id: "deploy-node-do-console-sign-up-create-your-first-droplet",
    title: "Sign Up & Create Your First Droplet",
    description: "Learn to deploy an existing Node.js application to a Droplet using the browser-based terminal, Git, and process management.",
    type: "exercise",
    content: `
Before you can deploy code, you need a server to host it. In the cloud world, we don't buy physical hardware; we rent virtualized slices of a massive server farm. DigitalOcean calls these virtual machines **Droplets**.

In this lesson, we will create the infrastructure required for the rest of this chapter.

### Overview

**What you'll learn:**

  * Creating a DigitalOcean Cloud account
  * Navigating the Project dashboard
  * Configuring a Virtual Machine (OS, Region, Size)
  * Setting up Root Authentication

### Account Setup & Project Creation

**Goal:** Establish your account and create a workspace for your resources.

**User Story:** As a new Cloud User, I need to create an organization so that I can group my resources and manage billing effectively.

#### Instructions

1.  **Sign Up**

      * Go to DigitalOcean.com and sign up.
      * *Note: You may need to enter a payment method to verify your identity, even if you are using free trial credits.*
      * You may use your [\$200 of free credits with GitHub for Education](https://www.digitalocean.com/github-students)

2.  **Create a Project**

      * Once logged in, look at the left sidebar.
      * Click **"+ New Project"**.
      * Name your project **"Node-Learning"**.
      * For the description, select "Just trying out DigitalOcean" or "Educational purposes".
      * Click **Create Project**.
`
  },
  {
    id: "deploy-node-do-console-provisioning-the-droplet",
    title: "Provisioning the Droplet",
    description: "Learn to deploy an existing Node.js application to a Droplet using the browser-based terminal, Git, and process management.",
    type: "exercise",
    content: `
**Goal:** Configure the hardware and software specifications for your server.

**User Story:** As a System Administrator, I want to select the most cost-effective and performant region and operating system for my application.

### Instructions

1.  **Initiate Creation**

      * Inside your new project, locate the large green button labeled **"Create"** at the top.
      * Select **"Droplets"** from the dropdown menu.

2.  **Choose Region**

      * Select the datacenter region closest to you (or your potential users).
      * *Example: If you are near New York, choose NYC1 or NYC3.*

3.  **Choose an Image (Operating System)**

      * Select the **OS** tab.
      * Choose **Ubuntu**.
      * Select the latest **LTS** (Long Term Support) version (e.g., 24.04 LTS or 22.04 LTS).
      * *Why? The next lesson uses \`apt\` commands, which are specific to Debian/Ubuntu systems.*

4.  **Choose Size (CPU & RAM)**

      * Select **Basic**.
      * Under "Disk Type", select **Regular SSD** (usually on the left).
      * Select the cheapest option (usually \$4/mo or \$6/mo).
      * *Note: This is plenty of power for the simple Node app we will deploy.*
      * *Note: not all regions have all options available. If you do not see the cheapest option available in your region, select another region like New York or San Francisco.*
`
  },
  {
    id: "deploy-node-do-console-authentication-finalize",
    title: "Authentication & Finalize",
    description: "Learn to deploy an existing Node.js application to a Droplet using the browser-based terminal, Git, and process management.",
    type: "exercise",
    content: `
**Goal:** Secure the server and launch it.

**User Story:** As a Security Engineer, I need to set strong credentials so that unauthorized users cannot access the server.

### Instructions

1.  **Authentication Method**

      * Scroll down to the **Authentication Method** section.
      * Select **Password**.
      * Create a highly secure root password.
      * *Important: Save this password in a password manager. You will need it if the Web Console fails.*

2.  **Hostname**

      * Scroll to "Finalize and Create".
      * Change the default hostname (which looks like \`ubuntu-s-1vcpu-1gb-nyc1\`) to something simple, like: \`node-demo-server\`.

3.  **Create Droplet**

      * Click the large green **Create Droplet** button at the bottom.
      * You will be redirected to the dashboard. Watch the blue progress bar fill up.
`
  },
  {
    id: "deploy-node-do-console-challenge-locate-your-public-ip",
    title: "Challenge: Locate Your Public IP",
    description: "Learn to deploy an existing Node.js application to a Droplet using the browser-based terminal, Git, and process management.",
    type: "challenge",
    content: `
**Goal:** Identify the address needed to connect to your server.

**User Story:** As a Developer, I need to know the public IP address of my server so I can point my browser and terminal commands to the right place.

### The Task

Once the progress bar finishes and the Droplet is green/active, you need to find its **Public IP Address**. You will need this specifically for the next lesson.

### Instructions

1.  Wait for the Droplet creation to finish.
2.  Hover over the IP address displayed next to your Droplet name.
3.  Click "Copy".

### 💡 Code Hints

Where is it located?



### 🔍 Diving Deeper

**What is a Droplet?**
"Droplet" is simply DigitalOcean's marketing term for a VPS (Virtual Private Server). It acts exactly like a standalone physical computer, but it shares hardware resources with other Droplets in a massive datacenter.

### Lesson Complete\! 🎉

**Congratulations\!** You are now the owner of a live server running Ubuntu. It is currently sitting idle, waiting for commands.

### Summary

You verified the following skills:

  * **Cloud Provisioning:** creating a virtual server.
  * **OS Selection:** Choosing Ubuntu LTS.
  * **Resource Sizing:** Selecting an appropriate CPU/RAM tier.

### Next Steps

Now that the server is running, let's log into it\! In the next lesson, we will bypass SSH keys and use the browser console to deploy your app.
`
    ,codeSnippets: [
      {
        language: "text",
        summary: "show Me: Location",
        code: `
It is usually right next to the Droplet name in the "Resources" list. 
It looks like four sets of numbers separated by dots (e.g., 147.12.33.201).
`,
        description: "Snippet for: show Me: Location"
      }
    ]
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

### How They Work Together

![alt:Show Me: Full-Stack Architecture Diagram showing React frontend on port 5173 making HTTP requests (GET, POST, PUT, DELETE) to Express API on port 3000, which connects to Supabase/Postgres database. Arrows show request flow from browser through CORS-enabled API to database and back.](./data/images/full-stack-architecture-diagram.png)

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
  },
  {
    id: "deploy-node-do-console-understanding-clean-up-destroying-your-droplet",
    title: "Understanding Clean Up: Destroying Your Droplet",
    description: "Learn to deploy an existing Node.js application to a Droplet using the browser-based terminal, Git, and process management.",
    type: "reading",
    content: `
In the cloud, you pay for what you reserve, not just what you use. A common mistake beginners make is "stopping" (turning off) a server and assuming the billing stops.

**It does not.** Even if a server is powered off, DigitalOcean must reserve the disk space and IP address for you, so they continue to charge you. To stop the billing completely, you must **destroy** the Droplet.

### Overview

**What you'll learn:**

* The difference between "Power Off" and "Destroy"
* Navigating the Destroy menu
* Verifying resource removal
`
  },
  {
    id: "deploy-node-do-console-understanding-power-off-vs-destroy",
    title: "Understanding: Power Off vs. Destroy",
    description: "Learn to deploy an existing Node.js application to a Droplet using the browser-based terminal, Git, and process management.",
    type: "reading",
    content: `
**Goal:** Understand the billing implications of your actions.

**User Story:** As a Freelancer, I need to understand how cloud billing works so that I don't receive invoices for projects I finished months ago.

### The Distinction

* **Power Off (Halt):** You turn the computer off. The CPU and RAM are freed, but the **Hard Drive (SSD)** and **IP Address** remain yours. **You are still billed.**
* **Destroy:** You delete the virtual machine entirely. The data is wiped, the IP is released to the public pool, and the SSD is formatted. **Billing stops immediately.**
`
  },
  {
    id: "deploy-node-do-console-destroying-the-resource",
    title: "Destroying the Resource",
    description: "Learn to deploy an existing Node.js application to a Droplet using the browser-based terminal, Git, and process management.",
    type: "exercise",
    content: `
**Goal:** Permanently remove the server we created in this chapter.

**User Story:** As a Project Manager, I want to decommission unused environments to keep project costs within budget.

### Instructions

1.  **Navigate to Settings**
    * Go back to your DigitalOcean main dashboard.
    * Click on the name of your Droplet (\`node-demo-server\`).
    * In the left-hand sidebar menu, look for the option at the very bottom called **Destroy**.

2.  **Skip the Snapshots**
    * DigitalOcean will ask if you want to take a "Snapshot" (a backup) before destroying.
    * Since this was just a practice exercise, we do not need a backup.
    * Scroll down to the section titled **"Destroy Droplet"**.

3.  **Confirm Destruction**
    * Click the big red button labeled **"Destroy this Droplet"**.
    * **Security Check:** To prevent accidental deletion, you will be asked to type the name of the Droplet to confirm.
    * Type: \`node-demo-server\` (or whatever you named it).
    * Click **Destroy**.

4.  **Verify Removal**
    * You will be redirected to the Project Dashboard.
    * Ensure the list of Droplets is now empty.
    * A blue notification usually appears in the top right saying "Droplet has been destroyed."
`
  },
  {
    id: "deploy-node-do-console-challenge-check-your-billing",
    title: "Challenge: Check Your Billing",
    description: "Learn to deploy an existing Node.js application to a Droplet using the browser-based terminal, Git, and process management.",
    type: "challenge",
    content: `
**Goal:** Ensure no other hidden costs are lingering.

**User Story:** As a User, I want to double-check my active resources to ensure my account balance is safe.

### The Task
Navigate to the billing section to confirm your current usage.

### Instructions
1.  Click **"Manage"** in the left sidebar (main navigation).
2.  Click **"Billing"**.
3.  Scroll down to "Month-to-Date Summary".
4.  You should see a very small charge (likely less than \$0.05) for the time the server was running today.

### 🔍 Diving Deeper

**Hourly vs. Monthly Billing**
DigitalOcean (and most cloud providers) bills by the hour, up to a monthly cap.
If a Droplet costs \$6/month, that is roughly **\$0.009 per hour**.
If you run a server for 2 hours to practice and then destroy it, you strictly pay for those 2 hours (approx \$0.02). This makes the cloud an incredibly cheap place to learn if you remember to clean up!

### Chapter Complete! 🏆

**You have finished the "First Steps in the Cloud" chapter.**

### Summary
In this chapter, you have:
1.  **Provisioned** a fresh Linux server (Ubuntu).
2.  **Accessed** it via a web console without needing SSH keys.
3.  **Deployed** a Node.js application using Git and PM2.
4.  **Decommissioned** the server to save money.
`
  }
];

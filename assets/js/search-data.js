// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "Blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-education",
          title: "Education",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/education/";
          },
        },{id: "nav-experience",
          title: "Experience",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/experience/";
          },
        },{id: "nav-",
          title: "",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-publications",
          title: "Publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "dropdown-bookshelf",
              title: "bookshelf",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/books/";
              },
            },{id: "dropdown-resume",
              title: "resume",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/resume/";
              },
            },{id: "post-flow-networks",
        
          title: "Flow Networks",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/network-flows/";
          
        },
      },{id: "post-floyd-39-s-cycle-detection",
        
          title: "Floyd&#39;s Cycle Detection",
        
        description: "Detecting cycle in a linked list.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/floy-cycle-detection/";
          
        },
      },{id: "post-dynamic-programming-bitmask",
        
          title: "Dynamic Programming + Bitmask",
        
        description: "speeding up search through permutations for smaller inputs.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/bitmask-dp/";
          
        },
      },{id: "post-autocompletion-using-trie",
        
          title: "Autocompletion using Trie",
        
        description: "a trivial autocompletion using Trie",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/auto-completion-system/";
          
        },
      },{id: "post-a-gentle-introduction-to-trie",
        
          title: "A gentle introduction to Trie.",
        
        description: "fast and efficient prefix matching trees.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/trie/";
          
        },
      },{id: "post-a-post-with-tikzjax",
        
          title: "a post with TikZJax",
        
        description: "this is what included TikZ code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/tikzjax/";
          
        },
      },{id: "post-a-distill-style-blog-post",
        
          title: "a distill-style blog post",
        
        description: "an example of a distill-style blog post and main elements",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/distill/";
          
        },
      },{id: "books-discover-the-arjuna-in-you",
          title: 'Discover the Arjuna in You.',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/discover_arjuna/";
            },},{id: "news-a-simple-inline-announcement",
          title: 'A simple inline announcement.',
          description: "",
          section: "News",},{id: "news-a-long-announcement-with-details",
          title: 'A long announcement with details',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-a-simple-inline-announcement-with-markdown-emoji-sparkles-smile",
          title: 'A simple inline announcement with Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "News",},{id: "projects-echo",
          title: 'Echo',
          description: "a sequentially consistent replicated key-value store.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6B%72%73.%6E%61%6E%64%68%61%6E@%70%72%6F%74%6F%6E%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/var-nan", "_blank");
        },
      },{
        id: 'social-leetcode',
        title: 'LeetCode',
        section: 'Socials',
        handler: () => {
          window.open("https://leetcode.com/u/krsnandhan/", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/krsnandhan", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];

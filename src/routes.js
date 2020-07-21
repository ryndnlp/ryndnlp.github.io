//General
import Home from './components/home.vue';
import Projects from './components/projects.vue';
import NotFound from './components/notFound';
//Blog
import Blog from './components/blog';
import CreateBlog from './components/createBlog.vue';
import ShowBlogs from './components/showBlogs.vue';
import SingleBlog from './components/singleBlog';
//Extractor
import Extractor from './components/extractor';
//Forecast
import Forecast from './components/forecast';


export default[
    {path: '/', component: Home },
    {path: '/projects', component: Projects},
    {path: '*', component: NotFound},
    {path: '', component: Blog, 
        children: [
            {path:'/projects/blog/create', component: CreateBlog},
            {path:'/projects/blog/', component: ShowBlogs},
            {path: '/projects/blog/:id', component: SingleBlog}
        ]
    },
    {path: '/projects/extractor', component: Extractor},
    {path: '/projects/forecast', component: Forecast},
]



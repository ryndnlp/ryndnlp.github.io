//General
import Home from './components/home.vue';
import Projects from './components/projects.vue';
import NotFound from './components/notFound';

///Projects
//Blog
import Blog from './components/blog';
import CreateBlog from './components/createBlog.vue';
import ShowBlogs from './components/showBlogs.vue';
import SingleBlog from './components/singleBlog';
//Extractor
import Extractor from './components/extractor';
//Forecast
import Forecast from './components/forecast';
//Corona
import Corona from './components/corona';


export default[
    {path: '/', component: Home },
    {path: '*', component: NotFound},
    {path: '/projects', component: Projects},
    {path: '', component: Blog, 
        children: [
            {path:'/projects/blog/create', component: CreateBlog},
            {path:'/projects/blog/', component: ShowBlogs},
            {path: '/projects/blog/:id', component: SingleBlog}
        ]
    },
    {path: '/projects/extractor', component: Extractor},
    {path: '/projects/forecast', component: Forecast},
    {path: '/projects/corona', component: Corona}
]



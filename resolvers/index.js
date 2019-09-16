const { getUsers, createUser, updateUser, authorize, getUsersAndBugFixesCount, getUserById } = require('./user');
const { addProduct, updateProduct, deleteProduct, getAllProducts, getProductsByUserId, getProductById } = require('./product');
const { addQuery, getAllHelpRequests, getHelpRequestById, getHelpRequestsByUserId, updateHelpRequest, deleteHelpRequest } = require('./help');
const { addInterview, getAllInterviews, getInterviewById, getInterviewsByUserId, updateInterview, deleteInterview } = require('./interview');
const { addTesting, getAllTestings, getTestingById, getTestingsByUserId, updateTesting, deleteTesting } = require('./testing');
const { addHowtodoc, getAllHowtodocs, getHowtodocById, getHowtodocsByUserId, updateHowtodoc, deleteHowtodoc } = require('./how-to-doc');
const { addRequirement, getAllRequirements, getRequirementById, getRequirementsByUserId, updateRequirement, deleteRequirement } = require('./requirement');
const { addDesign, getAllDesigns, getDesignById, getDesignsByUserId, updateDesign, deleteDesign } = require('./design')
const { addComment, updateComment, getComments, getCommentsByReferenceId, deleteComment } = require('./comment')
const { searchCategories } = require('./categories');
const { addTransaction, getPurchasedUnitsByUserId } = require('./purchase');
const { addToCart, removeItemFromCart, getCartItemsList } = require('./cart');
const { like, checkIfUserLikedAndLikeCount } = require('./like')

module.exports = {
  Query: {
    hello: () => 'Hello world!',
    getUsers,
    getUsersAndBugFixesCount,
    getUserById,

    getAllProducts,
    getProductsByUserId,
    getProductById,

    getComments,
    getCommentsByReferenceId,
    deleteComment,

    getAllHelpRequests,
    getHelpRequestsByUserId,
    getHelpRequestById,
  
  
    getAllInterviews,
    getInterviewsByUserId,
    getInterviewById,

    getAllTestings,
    getTestingById,
    getTestingsByUserId,

    getAllHowtodocs,
    getHowtodocById,
    getHowtodocsByUserId,
  
  
    getAllRequirements,
    getRequirementsByUserId,
    getRequirementById,

    getAllDesigns,
    getDesignsByUserId,
    getDesignById,

    searchCategories,

    getPurchasedUnitsByUserId,

    getCartItemsList,

    checkIfUserLikedAndLikeCount

  },
  Mutation: {
    createUser,
    updateUser,
    authorize,

    addProduct,
    updateProduct,
    deleteProduct,


    addComment,
    updateComment,

    addQuery,
    updateHelpRequest,
    deleteHelpRequest,

    addInterview,
    updateInterview,
    deleteInterview,

    addRequirement,
    updateRequirement,
    deleteRequirement,

    addTesting,
    updateTesting,
    deleteTesting,

    addHowtodoc,
    updateHowtodoc,
    deleteHowtodoc,

    addDesign,
    updateDesign,
    deleteDesign,

    addTransaction,

    addToCart,
    removeItemFromCart,

    like

  },

  descriptionBlocks: {
    __resolveType(block, context, info) {

      switch(block.type) {

        case 'paragraph':
          return 'ParagraphBlock'

        case 'header':
          return 'HeaderBlock'

        case 'code':
          return 'CodeBlock';

        case 'image': 
          return 'ImageBlock';

        case 'list':
          return 'ListBlock'

        case 'quote':
          return 'QuoteBlock'

        case 'table':
          return 'TableBlock'

        case 'warning':
          return 'WarningBlock'

        default:
          console.log('default case')
          return null;
      }
    },
  },

};

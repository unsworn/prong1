#ifndef template_H_
#define template_H_
              
enum 
{            
    GAME_TYPE_UNKNOWN,
    GAME_TYPE_INFO,
    GAME_TYPE_MARK,
    GAME_TYPE_BASE,
    GAME_TYPE_GRAPHIC,
    GAME_TYPE_PROPERTY
};

enum
{                    
    GAME_CLASS_NONE,
    GAME_CLASS_PLAYER,
    GAME_CLASS_BACKGROUND,
    GAME_CLASS_ENTITY,
    GAME_CLASS_STATIC
};

enum
{
    GAME_MARK_TL,
    GAME_MARK_TR,
    GAME_MARK_BL,
    GAME_MARK_BR
};
                        
/**
 * Point
 */
class Point
{         
public:
    Point() : x(0), y(0) {}        
    float x;
    float y;
};
   
/**
 * Dimension
 */
class Size
{         
public:
    Size() : width(0), height(0) {}
    float width;
    float height;
};

/**
 * Rectangle
 */
class Rect
{
public:
    Rect() {}
    bool isEmpty() { return size.width == 0 || size.height == 0; }    
public:    
    Point origin;
    Size  size;
};
                                       
/**
 * Template Box
 */        
class Box
{
public:
    Box();
    virtual ~Box();


    Box*  next;  
    Box*  owner;                          
    char* name;       
    char* parent;
    int   type;
    int   clazz;      
    Rect  abs;
    Rect  rel;      
    char* path;
    bool  enabled;
};

class Region
{
public:
    Region() : width(0), height(0), insetsX(0), insetsY(0) {}
    virtual ~Region() {}
    
    void setSource(unsigned int w, unsigned int h) { width = w; height = h; }

    void setInsets(unsigned int x, unsigned int y) { insetsX = x; insetsY = y; }

    void get(Box* ptr, Rect &r)
    {
        if (NULL == ptr)
            return ;
        
        r.origin.x    = ptr->rel.origin.x    * width;
        r.origin.y    = ptr->rel.origin.y    * height;            
        r.size.width  = ptr->rel.size.width  * width;
        r.size.height = ptr->rel.size.height * height;            
        
        r.origin.x += insetsX;
        r.origin.y += insetsY;
        
        r.size.width  -= (2 * insetsX);
        r.size.height -= (2 * insetsY);

    }
    
private:
    unsigned int width;
    unsigned int height;
    unsigned int insetsX;
    unsigned int insetsY;
};
        
/**
 * Game Template
 */           
class Template
{
public:
    Template();
    virtual ~Template();      
    
    bool   read(const char* path);
                                
    void   setSkewAngle(double angle) { skew = angle; }
    
    double getSkewAngle() { return skew; }
    
    Box*   getFirstBox()  { return box; }
                    
    Box*   getBox(const char* name, int type=-1);

    void   setCrop(Rect &r);
    
    Rect&  getCrop()      { return crop; }

    Point& getMark(int m) { return mark[m]; }

    Size&  getSize() { return size; }

    Size&  getMarkSize() { return markSz; }

    void   setFinalScale(double s) { scale = s; }

    double getFinalScale() { return scale; }

    void   setFinalHeight(int h) { fh = h; }

    int    getFinalHeight() { return fh; }

    
protected:
    void   fromObject(void* ptr);
        
private:
    Box*   box;
    Point  mark[4];
    Rect   crop;
    double skew;
    Size   size;
    Size   markSz;
    bool   points;
    double scale;
    unsigned int fh;
};    

#endif

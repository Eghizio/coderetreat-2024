module Implementation
  
  class NotNumberError < StandardError; end

  module Logger
    def self.log(message)
      puts message
    end
  end

  def calculate(x, y)
      
    unless x.is_a?(Numeric) # && !x.nan?
      raise NotNumberError, "x is not a number or is NaN. x: #{x.class} = #{x.inspect}"
    end

    unless y.is_a?(Numeric) #&& !y.nan?
      raise NotNumberError, "y is not a number or is NaN. y: #{y.class} = #{y.inspect}"
    end

    Logger.log("Calculating for (x, y) = (#{x}, #{y})...")
    x + y
  end

end